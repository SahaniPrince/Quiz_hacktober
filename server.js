const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const OLLAMA_HOST = '127.0.0.1';
const OLLAMA_PORT = 11434;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API ROUTE: Check Ollama Status & List Models
  if (req.url === '/api/status' && req.method === 'GET') {
    const statusReq = http.request({
      hostname: OLLAMA_HOST,
      port: OLLAMA_PORT,
      path: '/api/tags',
      method: 'GET',
      timeout: 3000
    }, (ollamaRes) => {
      let data = '';
      ollamaRes.on('data', chunk => data += chunk);
      ollamaRes.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        try {
          const parsed = JSON.parse(data);
          const hasGemma = parsed.models && parsed.models.some(m => m.name && m.name.includes('gemma3:4b'));
          res.end(JSON.stringify({
            online: true,
            hasGemma: hasGemma,
            configuredModel: 'gemma3:4b',
            models: parsed.models || []
          }));
        } catch (e) {
          res.end(JSON.stringify({ online: true, configuredModel: 'gemma3:4b', models: [] }));
        }
      });
    });

    statusReq.on('error', (err) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        online: false,
        configuredModel: 'gemma3:4b',
        error: 'Ollama service is not responding on 127.0.0.1:11434. Run: ollama run gemma3:4b'
      }));
    });

    statusReq.on('timeout', () => {
      statusReq.destroy();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        online: false,
        configuredModel: 'gemma3:4b',
        error: 'Connection to Ollama timed out.'
      }));
    });

    statusReq.end();
    return;
  }

  // API ROUTE: Ollama Chat Proxy (supports non-streaming and streaming)
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let parsedPayload;
      try {
        parsedPayload = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        return;
      }

      // Default model to gemma3:4b
      const ollamaPayload = JSON.stringify({
        model: parsedPayload.model || 'gemma3:4b',
        messages: parsedPayload.messages || [],
        stream: false,
        options: {
          temperature: parsedPayload.temperature !== undefined ? parsedPayload.temperature : 0.7
        }
      });

      const ollamaReq = http.request({
        hostname: OLLAMA_HOST,
        port: OLLAMA_PORT,
        path: '/api/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(ollamaPayload)
        },
        timeout: 60000 // 60s for local 4B model inference
      }, (ollamaRes) => {
        res.writeHead(ollamaRes.statusCode, { 'Content-Type': 'application/json' });
        ollamaRes.pipe(res);
      });

      ollamaReq.on('error', (err) => {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Could not connect to Ollama service at 127.0.0.1:11434. Please verify Ollama is running (`ollama run gemma3:4b`).',
          details: err.message,
          model: 'gemma3:4b'
        }));
      });

      ollamaReq.on('timeout', () => {
        ollamaReq.destroy();
        res.writeHead(504, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Inference timed out on local Ollama model gemma3:4b.',
          model: 'gemma3:4b'
        }));
      });

      ollamaReq.write(ollamaPayload);
      ollamaReq.end();
    });
    return;
  }

  // STATIC FILE SERVING
  let sanitizedUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, sanitizedUrl === '/' ? 'front.html' : sanitizedUrl);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'front.html');
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`StudyPath platform running at http://localhost:${PORT}/`);
  console.log(`Configured for Ollama local model: gemma3:4b`);
});

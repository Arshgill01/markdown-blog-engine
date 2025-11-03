# Sentinel - Password Security Analyzer

A privacy-first password strength analyzer that combines theoretical entropy analysis with real-world breach data to give users actionable security insights.

![Python](https://img.shields.io/badge/python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 The Innovation

Most password checkers fall into two camps:
1. **Pattern-based analyzers** that check for length, symbols, etc. (but miss real-world vulnerabilities)
2. **Breach checkers** that only tell you if a password is compromised (but not *why* it's weak)

**Sentinel does both** — using a hybrid analysis engine that:
- Analyzes password entropy and crack time using industry-standard algorithms
- Checks against billions of real breached passwords via the "Have I Been Pwned" API
- Uses **k-Anonymity** to ensure your password never leaves your machine in plain text
- Presents results in a clean, conversational interface

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Frontend)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  index.html  │  │   style.css  │  │  script.js   │  │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘  │
│         │                                     │          │
│         └─────────────────┬───────────────────┘          │
└───────────────────────────┼──────────────────────────────┘
                            │ POST /analyze
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Flask Backend (app.py)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │  1. Receive password                             │   │
│  │  2. Run zxcvbn entropy analysis                  │   │
│  │  3. Check HIBP API (k-Anonymity)                 │   │
│  │  4. Generate secure recommendations              │   │
│  │  5. Return JSON response                         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│         External APIs & Data Sources                     │
│  • Have I Been Pwned API (breach data)                   │
│  • EFF Wordlist (passphrase generation)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
password-strength-analyzer/
├── app.py                    # Flask backend (main application logic)
├── requirements.txt          # Python dependencies
├── wordlist.txt             # EFF dice-ware wordlist (7,776 words)
├── start.sh                 # Server startup script
├── venv/                    # Virtual environment (not committed)
└── static/                  # Frontend assets
    ├── index.html          # Main HTML structure
    ├── style.css           # Minimal, clean styling
    └── script.js           # Frontend logic & API communication
```

---

## 🔧 How It Works

### **1. Frontend Flow (`static/`)**

#### **`index.html`**
- Minimal chat-based interface
- Password input with visibility toggle
- Container for dynamically generated message bubbles

#### **`style.css`**
- Clean, minimal design (no gradients or excessive colors)
- Neutral palette: white, gray, black
- Responsive chat bubbles with subtle borders
- Score badges with color-coded severity

#### **`script.js`**
The frontend orchestration:

```javascript
// User submits password
analyzePassword() {
  1. Shows typing indicator
  2. POSTs to /analyze endpoint
  3. Receives JSON response
  4. Displays results as chat messages
  5. Renders Chart.js breach visualization
}
```

**Key Functions:**
- `addMessage()` - Creates chat bubbles dynamically
- `createBreachChart()` - Visualizes breach count using Chart.js
- `displayResults()` - Parses backend JSON and renders UI

---

### **2. Backend Flow (`app.py`)**

#### **Core Libraries Used**

| Library | Purpose |
|---------|---------|
| **Flask** | Lightweight web framework |
| **zxcvbn** | Industry-standard password strength estimator (used by Dropbox, 1Password) |
| **requests** | HTTP client for HIBP API calls |
| **hashlib** | SHA-1 hashing for k-Anonymity |
| **secrets** | Cryptographically secure random generation |

#### **Main Endpoint: `/analyze`**

```python
@app.route('/analyze', methods=['POST'])
def analyze():
    password = request.json['password']
    
    # Step 1: Entropy Analysis
    analysis = zxcvbn(password)
    # Returns: score (0-4), crack_time, feedback
    
    # Step 2: Breach Check (k-Anonymity)
    breach_count = check_breach(password)
    
    # Step 3: Generate Recommendations
    passphrase = generate_passphrase()  # 4-word memorable
    random_pwd = generate_random_password()  # 16-char secure
    
    return jsonify({...})
```

---

### **3. The k-Anonymity Magic** 🔒

**Problem:** Sending passwords to an API is dangerous, even over HTTPS.

**Solution:** k-Anonymity via SHA-1 hash prefix matching.

#### How It Works:

```python
def check_breach(password):
    # 1. Hash the password locally
    sha1 = hashlib.sha1(password.encode()).hexdigest().upper()
    # Example: "P@ssw0rd" → "21BD12DC183F740EE76F27B78EB39C8AD972A757"
    
    # 2. Split hash into prefix (5 chars) and suffix
    prefix = sha1[:5]   # "21BD1"
    suffix = sha1[5:]   # "2DC183F740EE76F27B78EB39C8AD972A757"
    
    # 3. Send ONLY the prefix to HIBP API
    response = requests.get(f'https://api.pwnedpasswords.com/range/{prefix}')
    
    # 4. HIBP returns ~500 hash suffixes starting with "21BD1"
    # Example response:
    # 2DC183F740EE76F27B78EB39C8AD972A757:3645804
    # 3F8A9C2E1D4B5A6C7E8F9D0A1B2C3D4E5F6:123
    # ...
    
    # 5. Search locally for our suffix
    for line in response.text.splitlines():
        hash_suffix, count = line.split(':')
        if hash_suffix == suffix:
            return int(count)  # Password found in breaches!
    
    return 0  # Not found - safe!
```

**Privacy Guarantee:** Your full password hash never leaves your machine. HIBP only sees 5 characters, which could match thousands of different passwords.

---

### **4. Password Strength Analysis (zxcvbn)**

Unlike simple "length + symbols" checkers, zxcvbn uses:

- **Pattern matching** (detects "P@ssw0rd" style substitutions)
- **Dictionary attacks** (common words, names, keyboard patterns)
- **Entropy calculation** (actual bits of randomness)
- **Crack time estimation** (realistic attack scenarios)

#### Score System:

| Score | Label | Crack Time | Recommendation |
|-------|-------|------------|----------------|
| 0 | Terrible | < 1 minute | Change immediately |
| 1 | Weak | < 1 hour | Too weak |
| 2 | Fair | < 1 day | Could be better |
| 3 | Strong | < 1 month | Good for most uses |
| 4 | Very Strong | Centuries | Excellent |

**Example Feedback:**
```json
{
  "score": 1,
  "crack_time": "2 minutes",
  "feedback": ["This is a very common password", "Add more words or uncommon words"]
}
```

---

### **5. Passphrase Generation**

Uses the **EFF Dice-ware Wordlist** (7,776 words) for memorable, secure passphrases.

```python
def generate_passphrase(num_words=4):
    words = random.sample(WORDLIST, num_words)
    return '-'.join(words)
    # Example: "vivid-ocean-barks-loudly"
```

**Why 4 words?**
- 7,776⁴ = ~3.6 trillion combinations
- Entropy: ~51 bits
- Easy to remember, hard to crack

---

## 🚀 Getting Started

### **Prerequisites**
- Python 3.9+
- pip
- macOS/Linux (or Windows with WSL)

### **Installation**

```bash
# 1. Clone the repository
cd password-strength-analyzer

# 2. Create virtual environment
python3 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
.\venv\Scripts\activate  # Windows

# 4. Install dependencies
pip install -r requirements.txt

# 5. Download EFF wordlist (if not present)
curl -o wordlist.txt https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt

# 6. Run the server
python app.py
# or
./start.sh
```

### **Access the App**

Open your browser to: **http://127.0.0.1:5000**

---

## 🧪 Testing Examples

Try these passwords to see different behaviors:

| Password | Expected Result |
|----------|-----------------|
| `password` | Score: 0, Breached: 3M+ times |
| `P@ssw0rd!2024` | Score: 1-2, Common pattern, breached |
| `correct-horse-battery-staple` | Score: 3-4, Strong passphrase, rare |
| `MyDog2024!` | Score: 2, Dictionary word + predictable pattern |
| `xK9#mQ$7pL@2vN&4` | Score: 4, Very strong, likely not breached |

---

## 📊 API Response Format

```json
{
  "score": 2,
  "crack_time": "8 hours",
  "feedback": [
    "Add another word or two",
    "Avoid predictable patterns"
  ],
  "warning": "This is similar to a commonly used password",
  "breach_count": 12450,
  "passphrase": "vivid-ocean-barks-loudly",
  "random": "xK9#mQ$7pL@2vN&4"
}
```

---

## 🔐 Security Considerations

### **What We Do Right:**
✅ **k-Anonymity** - Passwords never sent in plain text  
✅ **No logging** - Passwords aren't stored anywhere  
✅ **Stateless** - No database, no session storage  
✅ **Client-side hashing** - SHA-1 computed in backend (local to server)  
✅ **HTTPS ready** - Can be deployed with SSL/TLS

### **Production Checklist:**
- [ ] Deploy behind **HTTPS** (use nginx + Let's Encrypt)
- [ ] Add **rate limiting** (flask-limiter)
- [ ] Use **Gunicorn/uWSGI** instead of Flask dev server
- [ ] Add **CSP headers** for XSS protection
- [ ] Enable **HSTS** (HTTP Strict Transport Security)

---

## 🎨 Design Philosophy

**Minimal & Functional:**
- No excessive gradients or animations
- Clean typography (system fonts)
- Subtle borders instead of heavy shadows
- Neutral color palette
- Fast, responsive interactions

**Conversational, Not Chatty:**
- Direct, informative messages
- No unnecessary emojis
- Professional tone
- Clear actionable recommendations

---

## 🛠️ Tech Stack Summary

| Layer | Technology | Why? |
|-------|-----------|------|
| **Backend** | Flask | Lightweight, perfect for single API endpoint |
| **Password Analysis** | zxcvbn | Industry standard (Dropbox, 1Password) |
| **Breach Data** | HIBP API | 11B+ breached passwords, privacy-first |
| **Frontend** | Vanilla JS | No frameworks, fast load, easy to understand |
| **Visualization** | Chart.js | Simple, clean bar charts |
| **Styling** | Custom CSS | Minimal, no dependencies |

---

## 📈 Future Enhancements

- [ ] Add multi-language support
- [ ] Export analysis reports as PDF
- [ ] Browser extension version
- [ ] Batch password analysis
- [ ] Password history tracking (client-side only)
- [ ] Integration with password managers
- [ ] Dark mode toggle
- [ ] Mobile-optimized responsive design

---

## 📝 License

MIT License - Feel free to use, modify, and distribute.

---

## 🙏 Credits

- **Have I Been Pwned API** by Troy Hunt
- **zxcvbn** by Dropbox Security Team
- **EFF Dice-ware Wordlist** by Electronic Frontier Foundation
- **Chart.js** visualization library

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill existing process
kill -9 <PID>

# Restart server
./start.sh
```

### Module not found errors
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### HIBP API errors (breach_count = -1)
- Check internet connection
- HIBP API might be temporarily down
- Rate limiting (unlikely for normal use)

---

**Built with ❤️ for better password security**

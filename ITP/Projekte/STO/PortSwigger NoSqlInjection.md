# NoSql injections
#ITP 

><span style="color:#00b050">NoSQL injection is a vulnerability where an attacker is able to interfere with the queries that an application makes to a NoSQL database.</span>

**NoSQL injection may enable an attacker to:**
- Bypass authentication or protection mechanisms.
- Extract or edit data.
- Cause a denial of service.
- Execute code on the server.

**There are two different types of NoSQL injections:**
- Syntax injection
- Operator injection


## Syntax Injection

To detect if a server is vulnerable to syntax injection systematically test each input by submitting fuzz strings and special characters. If the server responds different with those inputs it's a hint that it's vulnerable to syntax injections.
### Examples:

Normal URL:
``https://insecure-website.com/product/lookup?category=fizzy``

Through this 
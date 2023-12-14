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

Through this link a JSON query gets sent with the information:
`this.category == fizzy`

Try replacing it with:
``https://insecure-website.com/product/lookup?category='%22%60%7b%0d%0a%3b%24Foo%7d%0d%0a%24Foo%20%5cxYZ%00``

>[!NFO] Note
>NoSQL injection vulnerabilities can occur in a variety of contexts, and you need to adapt your fuzz strings accordingly. Otherwise, you may simply trigger validation errors that mean the application never executes your query.
>
>In this example, we're injecting the fuzz string via the URL, so the string is URL-encoded. In some applications, you may need to inject your payload via a JSON property instead. In this case, this payload would become ``'\"`{\r;$Foo}\n$Foo \\xYZ\u0000``.

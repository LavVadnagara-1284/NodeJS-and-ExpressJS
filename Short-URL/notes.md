# notes

```html
<ol>
    <% urls.forEach(url=> { %>
        <li>
            <%= url.shortID %> - <%= url.redirectURL %> - <%= url.visitHistory.length %>
        </li>
        <% }) %>
</ol>
```

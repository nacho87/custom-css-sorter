##### Compatible VsCode **^1.44.0** or upper
---

<h1 align="center"> Custom Css Sorter - VScode Extension </h1>

<p align="center"> Custom Rules when you sort your Css properties</p>
<p align="center"> In CSS you can select multiple lines of css and sorter using custom rules.</p>

<p align="center">

  <a href="https://marketplace.visualstudio.com/items?itemName=nachodecima.custom-css-sorter">
    <img alt="VS Code Marketplace Downloads" src="https://img.shields.io/visual-studio-marketplace/d/nachodecima.custom-css-sorter"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nachodecima.custom-css-sorter">
    <img alt="VS Code Marketplace Installs" src="https://img.shields.io/visual-studio-marketplace/i/nachodecima.custom-css-sorter"></a>
</p>


## Install

Click to extension tab and search `Custom Css Sorter` and install it reload your editor. Or use this [Custom Css Sorter](https://marketplace.visualstudio.com/items?itemName=NachoDecima.custom-css-sorter).

## How to Use - Configuration

Go to Settings `Custom Css Sorter` open `settings.json` and add to the array custom properties (example: `"content", "position", "display", "font"`) for apply the custom order that you decided or add one element `"alphabetical"` for use the alphabetic order in css.

- **Custom Order**
<p><img align="center" src="https://media.giphy.com/media/8yUWzwvYagAdD1bEr3/giphy.gif"/></p>

```
{
  ...,
  "order-custom-css.array": [
    "content",
    "contain",
    "display",
    "position",
    "width",
    "min-width",
    "max-width",
    "height",
    "min-height",
    "max-height",
  ]
}
```

---
<br>

- **Alphabetic Order**
<p><img align="center" src="https://media.giphy.com/media/YVuL7U9W8yLfHMk50K/giphy.gif"/></p>

```
{
  ...,
  "order-custom-css.array": ["alphabetical"]
}
```
---
- **Extra options**

If you are using some js template example EJS you can configure the open/close tag and string tag
```
{
  ...,
  "order-custom-css.array": ["alphabetical"],
  "order-custom-css.openTemplate":  "<%",
  "order-custom-css.closeTemplate": "%>",
  "order-custom-css.openTemplateString": "<%-"
}
```
<br>

## How to Use - Execution
Select the desired ones(supports for kind variable).
Using Command Palette `Cmd/Ctrl+ Shift+A` or
`Cmd+Shift+P` and select `Custom Css Sorter` thats it or you can select the lines that you want order press `right-click` and then click in `Order Css Properties`.

## For questions

[Repo](https://github.com/nacho87/custom-css-sorter)

## License

MIT © [Nacho](https://github.com/nacho87)

---

### Code Inspiration
[alphabetical-sorter](https://marketplace.visualstudio.com/items?itemName=ue.alphabetical-sorter)

---

### Thanks To:
[Jose Di Marco](https://github.com/joseignaciodimarco)

import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article>
          <h1>${entry.getIn(["data", "title"], null)}</h1>
          <p>
            <small>
              <time>
                  ${
                    (() => {
                      const date = entry.getIn(["data", "date"]);
                      if (!date) return "No date";
                      try {
                        return format(new Date(date), "dd MMM, yyyy");
                      } catch (e) {
                        return "Invalid date";
                      }
                    })()
                  }
              </time>
              
          by <strong>${entry.getIn(["data", "author"], "Author")}</strong>


            </small>
          </p>

          <p>${entry.getIn(["data", "summary"], "")}</p>

          ${this.props.widgetFor("body")}
          <p>
            ${
              entry.getIn(["data", "tags"], []).map(
                tag =>
                  html`
                    <a href="#" rel="tag">${tag}</a>
                  `
              )
            }
          </p>
        </article>
      </main>
    `;
  }
});

export default Post;

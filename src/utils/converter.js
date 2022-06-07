const jsonToHtml = {

    makeParagraph(obj) {
      return `<p className="blog_post_text">
                        ${obj.data.text}    
                    </p>`;
    },
    makeImage(obj) {
      const caption = obj.data.caption
        ? `<div className="blog_caption">
                                <p>${obj.data.caption}</p>
                            </div>`
        : '';
      return `<div className="blog_image">
                                <img src="${obj.data.file.url}" alt="${obj.data.caption}"/>
                                ${caption}
                        </div>`;
    },
    makeEmbed(obj) {
              const caption = obj.data.caption ? `<div className="list_item_btm_text">
             <p className="nws3_text1"> ${obj.data.caption}</p>
         </div>` : ''
              return `<section className="nws3_sec4">
              <div className="row justify-content-center">
                  <div className="col-12 col-md-10 col-lg-8">
                      <div className="list_item_btm">
                              <div className="list_item_btm_img">
                              <iframe width="730" height="415" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                              </div>
                              ${caption}
                          </div>
                  </div>
              </div>
          </section>`
    },
    makeHeader(obj) {
      return `<h${obj.data.level} className="blog_post_h${obj.data.level}">${obj.data.text}</h${obj.data.level}>`;
    },
    makeCode(obj) {
          return `<section className="nws3_sec4">
          <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                 <div className="news_code">
                      <pre>
                          <code className="html">
                          ${obj.data.code}
                          </code>
                       </pre>
                  </div>
              </div>
          </div>
      </section>	`
    },
    makeList(obj) {
      if (obj.data.style === 'unordered') {
        const list = obj.data.items.map((item) => {
          return `<li>${item}</li>`;
        });
        return `<ul className="blog_post_ul">
                            ${list.join('')}
                        </ul>`;
      } else {
        const list = obj.data.items.map((item) => {
          return `<li>${item}</li>`;
        });
        return `<ul className="blog_post_ul">
                            ${list.join('')}
                        </ul>`;
      }
    },
    makeQuote(obj) {
      return `<div className="spcl_line mar_b30">
                        <blockquote>
                            <p className="spcl_line_p">
                                ${obj.data.text}
                            </p>
                        </blockquote>
                        <p>- ${obj.data.caption}</p>
                    </div>`;
    },
    makeWarning(obj) {
      return `<section className="nws3_sec4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="table_warning">
                        
                        <h3><span><i className="fas fa-exclamation"></i></span>${obj.data.title}</h3>
                        <p>${obj.data.message}</p>
                    </div>
                </div>
            </div>
        </section>	`;
    },
    makeChecklist(obj) {
      const list = obj.data.items.map((item) => {
        return `<div className="_1checkbox">
                <span className="_1checkbox_round"></span>
                ${item.text}</div>`;
      });
      return `<section className="nws3_sec4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="table_top_sec">
                        ${list.join('')}
                    </div>
                </div>
            </div>
        </section>	`;
    },
    makeDelimeter(obj) {
      return `<div className="ce-block">
            <div className="ce-block__content">
                <div className="ce-delimiter cdx-block"></div>
            </div>
            </div>\n`;
    },
    
};


const outputHtml = (articleObj) => {
  let articleHTML = '';

  // eslint-disable-next-line array-callback-return
  articleObj.map((obj) => {
    switch (obj.type) {
      case 'paragraph':
        articleHTML += jsonToHtml.makeParagraph(obj);
        break;
      case 'image':
        articleHTML += jsonToHtml.makeImage(obj);
        break;
      case 'header':
        articleHTML += jsonToHtml.makeHeader(obj);
        break;
      case 'raw':
        articleHTML += `<div className="ce-block">
					<div className="ce-block__content">
					<div className="ce-code">
						<code>${obj.data.html}</code>
					</div>
					</div>
				</div>\n`;
        break;
      case 'code':
        articleHTML += jsonToHtml.makeCode(obj);
        break;
      case 'list':
        articleHTML += jsonToHtml.makeList(obj);
        break;
      case 'quote':
        articleHTML += jsonToHtml.makeQuote(obj);
        break;
      case 'warning':
        articleHTML += jsonToHtml.makeWarning(obj);
        break;
      case 'checklist':
        articleHTML += jsonToHtml.makeChecklist(obj);
        break;
      case 'embed':
        articleHTML += jsonToHtml.makeEmbed(obj);
        break;
      case 'delimeter':
        articleHTML += jsonToHtml.makeDelimeter(obj);
        break;
      default:
        return '';
    }
  });
    return articleHTML;
};


module.exports = {
    outputHtml,
    jsonToHtml,
}
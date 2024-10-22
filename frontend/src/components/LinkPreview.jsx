import { useEffect, useState } from "react";
import { Preview_API_KEY } from "../../configs";

const LinkPreview = ({ children }) => {
  const [previewData, setPreviewData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!children) return;

    const fetchingPreview = async () => {
      const requestData = { q: children }

      try {
        const res = await fetch(`https://api.linkpreview.net/?=${encodeURIComponent(children)}`, {
          method: 'POST',
          headers: {
            'X-Linkpreview-Api-KEY': `${Preview_API_KEY}`
          },
          mode: 'cors',
          body: JSON.stringify(requestData)
        });

        if (!res.ok) {
          throw new Error('Failed to fetch preview');
        }



        const data = await res.json();
        setPreviewData(data);
        setError(null)

      } catch (err) {
        setError(err.message)
        setPreviewData(null)
      }
    };

    fetchingPreview();
  }, [children])

  return (
    <div className="preview_link_container">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {previewData && (
        <div className="link">
          <div className="img_container">
            <img src={previewData.image} alt="Preview" />
          </div>
          <div className="info_link_container">
            <h2 className="link_title">{previewData.title}</h2>
            <p className="body">{previewData.description}</p>
            <a className="body" href={previewData.url} target="_blank" rel="noopener noreferrer">
              Visit Site!
            </a>
          </div>


        </div>
      )}
    </div>
  )
}

export default LinkPreview
import { useEffect, useState } from 'react';

export default function useWindowAndDocument() {
  const [_window, setWindowObject] = useState<Window | null>(null);
  const [_document, setDocumentObject] = useState<Document | null>(null);

  useEffect(() => {
    setWindowObject(window);
    setDocumentObject(document);
  }, []);

  return { _window, _document };
}

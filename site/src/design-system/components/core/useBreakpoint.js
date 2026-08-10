import React from 'react';

/** true bila lebar layar cocok dengan query. Default: ponsel & tablet sempit. */
export function useBreakpoint(query = '(max-width: 860px)') {
  const [match, setMatch] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  React.useEffect(() => {
    const mm = window.matchMedia(query);
    const handle = e => setMatch(e.matches);
    setMatch(mm.matches);
    mm.addEventListener('change', handle);
    return () => mm.removeEventListener('change', handle);
  }, [query]);
  return match;
}

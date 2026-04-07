export default function Home() {
  return (
    <div className="p-8">
      <p><a href="https://github.com/VincentQu888" target="_blank" rel="noopener noreferrer">vincent qu&apos;s</a> portfolio</p>
      <p>this portfolio is gonna be fire trust</p>
      <p>wip</p>
      <br/>
      <p>about:</p>
      <p>cs @ uoft + schulich leader scholarship</p>
      <p>incoming @ shopify</p>
      <p>learning about ml</p>
      <br/>
      <div data-webring="ca" data-member="vincent"></div>
      <script src="https://webring.ca/embed.js" defer></script>
      <br/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} className="w-full">
        <a href='https://uoftwebring.com/redirect?nav=prev&id=41'>←</a>
        <a href='https://uoftwebring.com' target='_blank'>
        <img
          src='https://uoftwebring.com/ring_logo.svg'
          alt='UofT Webring'
          style={{width: '24px', height: 'auto'}}
        />
        </a>
        <a href='https://uoftwebring.com/redirect?nav=next&id=41'>→</a>
      </div>
    </div>
  );
}

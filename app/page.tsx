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
      <div className="flex w-full justify-center">
        <div className="flex items-center gap-2">
          <a href="https://uoftwebring.com/redirect?nav=prev&id=41">←</a>
          <a href="https://uoftwebring.com" target="_blank">
              <img
                  src="https://uoftwebring.com/ring_logo.svg"
                  alt="UofT Webring"
                  className="w-6 h-auto"
              />
          </a>
          <a href="https://uoftwebring.com/redirect?nav=next&id=41">→</a>
        </div>
      </div>
    </div>
  );
}

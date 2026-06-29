import './globals.css'

export const metadata = {
  metadataBase: new URL('https://designhavenstudio.vercel.app'),
  title: { default:'DesignHaven Studio | Professional Poster Design', template:'%s | DesignHaven Studio' },
  description:'Bold, strategic poster design for businesses, brands and individuals.',
  openGraph:{title:'DesignHaven Studio',description:'Make your brand impossible to ignore.',type:'website'},
  robots:{index:true,follow:true}
}

export default function RootLayout({children}){
 return <html lang="en"><body>{children}</body></html>
}

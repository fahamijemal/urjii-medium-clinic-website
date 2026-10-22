import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={icons:{icon:{url:'/logo.jpg',type:'image/jpeg'},apple:'/logo.jpg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return children;}

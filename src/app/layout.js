'use client'
import "../styles/globals.css";
import "../styles/main.css";
import {store} from '../redux/store'
import {Provider} from 'react-redux'

export const metadata = {
    title: "Monaco Smart City",
    description: "Monaco Smart City",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            {children}
        </Provider>
        </body>
        </html>
    );
}

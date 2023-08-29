import "../styles/globals.css";
import "../styles/main.css";

export const metadata = {
  title: "Monaco Smart City",
  description: "Monaco Smart City",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      {children}
      </body>
      </html>
  );
}

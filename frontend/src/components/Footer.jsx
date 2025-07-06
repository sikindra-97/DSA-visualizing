// src/components/Footer.jsx
export default function Footer()  {
    return (
        <footer className="bg-blue-300 text-white text-center p-4 mt-4">
        <p>&copy; 2025 DSA Visualizer. By Sikindra</p>
        <div className="text-black">
          <p>
            Contact with me on{' '}
            <a
              href="https://www.linkedin.com/in/sikindra05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-700"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    );
  };
<p align="center">

  <h3 align="center">Gif Online Search Website</h3>

  <p align="center">
    Using GIPHY api third party.
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#built-with">Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#test">Test</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The project uses google firebase login and giphy third party.

### Built With

- [NextJS](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [GIPHY](https://api.giphy.com/)

<!-- GETTING STARTED -->

## Getting Started

The project runs on Node.js utilizing npm as the package manager.

### Prerequisites

Make sure you have node.js version 14 or above to run this project.

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/codert0109/gifsearch-next-firebase.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file using the configuration in `.env.example`
   ```sh
   touch .env
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Build the project
   ```sh
   npm run build
   ```
### Test

1. Run below command

   ```sh
   npm jest
   ```

<!-- USAGE -->

## Usage

### To search gifs, input the keyword in the search bar.
### To store your favorite gif, click favorite icon.
### To see your favorite gifs, click favorite tab.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- ACKNOWLEDGEMENTS -->
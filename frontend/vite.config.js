// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     proxy: {
// //       '/api': {
// //         target: 'http://localhost:4000',
// //         changeOrigin: true,
// //         secure: false,
// //       },
// //     },
// //   },
// // })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import history from 'connect-history-api-fallback'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000',
//         changeOrigin: true,
//         secure: false,
//       },
//     },

//   },
//   configureServer: ({ middlewares }) => {
//     middlewares.use(history())
//   },
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

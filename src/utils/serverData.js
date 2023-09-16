// const serverIP = "http://13.200.67.193:443" // "http://13.200.67.193:80"
const localIP = "http://capd-be.jssish.com:3000"  //"http://127.0.0.1:3000"   //"capd-be.capd.svc.cluster.local:3000"  //"http://192.168.0.15:30337"

// const availableIPs = [
//     "http://192.168.0.13:30337",
//     "http://192.168.0.14:30337",
//     "http://192.168.0.15:30337",
//   ];
  
//   async function findAvailableIP() {
//     for (const ip of availableIPs) {
//       try {
//         const response = await fetch(`${ip}/your-known-endpoint`);
//         if (response.status === 200) {
//           return ip; // Found an available IP, return it
//         }
//       } catch (error) {
//         // Handle any fetch errors (e.g., network issues)
//         console.error(`Error checking IP ${ip}: ${error}`);
//       }
//     }
  
//     // If none of the IPs are available, return a default IP or handle it as needed
//     return "http://192.168.0.13:30337";
//   }
  
  const backendIP = localIP; // await findAvailableIP();
  
  export default backendIP;
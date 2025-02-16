// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import SimplePeer from "simple-peer";
// // // // import {
// // // //   collection,
// // // //   addDoc,
// // // //   getDoc,
// // // //   doc,
// // // //   onSnapshot,
// // // // } from "firebase/firestore";
// // // // import { db } from "../firebase";

// // // // const VideoCall = () => {
// // // //   useEffect(() => {
// // // //     console.log("Came to video call");
// // // //   }, []);

// // // //   const [stream, setStream] = useState(null);
// // // //   const [callId, setCallId] = useState("");
// // // //   const [generatedCallId, setGeneratedCallId] = useState(""); // Store the created call ID
// // // //   const myVideoRef = useRef();
// // // //   const peerVideoRef = useRef();
// // // //   const peerConnection = useRef(null);

// // // //   const startVideo = async () => {
// // // //     try {
// // // //       const stream = await navigator.mediaDevices.getUserMedia({
// // // //         video: true,
// // // //         audio: true,
// // // //       });
// // // //       myVideoRef.current.srcObject = stream;
// // // //       setStream(stream);
// // // //     } catch (error) {
// // // //       console.error("Error accessing camera:", error);
// // // //     }
// // // //   };

// // // //   // const createCall = async () => {
// // // //   //   peerConnection.current = new SimplePeer({ initiator: true, stream });

// // // //   //   peerConnection.current.on("signal", async (signal) => {
// // // //   //     const docRef = await addDoc(collection(db, "calls"), { offer: JSON.stringify(signal) });
// // // //   //     setCallId(docRef.id);
// // // //   //     setGeneratedCallId(docRef.id); // Save the generated Call ID for display
// // // //   //   });

// // // //   //   peerConnection.current.on("stream", (peerStream) => {
// // // //   //     peerVideoRef.current.srcObject = peerStream;
// // // //   //   });
// // // //   // };
// // // //   const createCall = async () => {
// // // //     peerConnection.current = new SimplePeer({ initiator: true, stream });

// // // //     peerConnection.current.on("signal", async (signal) => {
// // // //       try {
// // // //         const docRef = await addDoc(collection(db, "calls"), {
// // // //           offer: JSON.stringify(signal),
// // // //         });
// // // //         console.log("Generated Call ID:", docRef.id); // Debugging
// // // //         setCallId(docRef.id);
// // // //         setGeneratedCallId(docRef.id);
// // // //       } catch (error) {
// // // //         console.error("Error creating call:", error);
// // // //       }
// // // //     });

// // // //     peerConnection.current.on("stream", (peerStream) => {
// // // //       peerVideoRef.current.srcObject = peerStream;
// // // //     });
// // // //   };

// // // //   // const joinCall = async () => {
// // // //   //   const docRef = doc(db, "calls", callId);
// // // //   //   const docSnap = await getDoc(docRef);

// // // //   //   if (docSnap.exists()) {
// // // //   //     peerConnection.current = new SimplePeer({ initiator: false, stream });

// // // //   //     peerConnection.current.on("signal", async (signal) => {
// // // //   //       await addDoc(collection(db, "calls"), {
// // // //   //         answer: JSON.stringify(signal),
// // // //   //       });
// // // //   //     });

// // // //   //     peerConnection.current.on("stream", (peerStream) => {
// // // //   //       peerVideoRef.current.srcObject = peerStream;
// // // //   //     });

// // // //   //     peerConnection.current.signal(JSON.parse(docSnap.data().offer));

// // // //   //     onSnapshot(docRef, (updatedDoc) => {
// // // //   //       if (updatedDoc.data().answer) {
// // // //   //         peerConnection.current.signal(JSON.parse(updatedDoc.data().answer));
// // // //   //       }
// // // //   //     });
// // // //   //   } else {
// // // //   //     alert("Call ID not found!");
// // // //   //   }
// // // //   // };
// // // //   const joinCall = async () => {
// // // //     if (!callId) {
// // // //       alert("Please enter a valid Call ID!");
// // // //       return;
// // // //     }

// // // //     const docRef = doc(db, "calls", callId);
// // // //     const docSnap = await getDoc(docRef);

// // // //     if (docSnap.exists()) {
// // // //       const offer = JSON.parse(docSnap.data().offer); // Extract offer signal

// // // //       peerConnection.current = new SimplePeer({ initiator: false, stream });

// // // //       peerConnection.current.on("signal", async (signal) => {
// // // //         // Save the answer back to Firestore
// // // //         await addDoc(collection(db, "calls"), {
// // // //           answer: JSON.stringify(signal),
// // // //         });
// // // //         console.log("Sent Answer:", signal);
// // // //       });

// // // //       peerConnection.current.on("stream", (peerStream) => {
// // // //         peerVideoRef.current.srcObject = peerStream;
// // // //       });

// // // //       // Signal the initiator with the received offer
// // // //       peerConnection.current.signal(offer);

// // // //       // Listen for the answer from Firestore
// // // //       onSnapshot(docRef, (updatedDoc) => {
// // // //         if (updatedDoc.exists() && updatedDoc.data().answer) {
// // // //           console.log("Received Answer:", updatedDoc.data().answer);
// // // //           peerConnection.current.signal(JSON.parse(updatedDoc.data().answer));
// // // //         }
// // // //       });
// // // //     } else {
// // // //       alert("Call ID not found!");
// // // //     }
// // // //   };

// // // //   const copyToClipboard = () => {
// // // //     navigator.clipboard.writeText(generatedCallId);
// // // //     alert("Call ID copied to clipboard!");
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Simple Video Call App</h2>
// // // //       <button onClick={startVideo}>Start Video</button>
// // // //       <button onClick={createCall}>Create Call</button>

// // // //       {/* Show the generated Call ID after creating a call */}
// // // //       {generatedCallId && (
// // // //         <div>
// // // //           <p>
// // // //             <strong>Call ID:</strong> {generatedCallId}
// // // //           </p>
// // // //           <button onClick={copyToClipboard}>Copy to Clipboard</button>
// // // //         </div>
// // // //       )}

// // // //       <input
// // // //         type="text"
// // // //         value={callId}
// // // //         placeholder="Enter Call ID"
// // // //         onChange={(e) => setCallId(e.target.value)}
// // // //       />
// // // //       <button onClick={joinCall}>Join Call</button>

// // // //       <div>
// // // //         <video
// // // //           ref={myVideoRef}
// // // //           autoPlay
// // // //           playsInline
// // // //           style={{ width: "300px" }}
// // // //         />
// // // //         <video
// // // //           ref={peerVideoRef}
// // // //           autoPlay
// // // //           playsInline
// // // //           style={{ width: "300px" }}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default VideoCall;




// // // import React, { useEffect, useRef, useState } from "react";
// // // import SimplePeer from "simple-peer";
// // // import { collection, addDoc, getDoc, doc, onSnapshot } from "firebase/firestore";
// // // import { db } from "../firebase";

// // // const VideoCall = () => {
// // //   const [stream, setStream] = useState(null);
// // //   const [callId, setCallId] = useState("");
// // //   const myVideoRef = useRef();
// // //   const peerVideoRef = useRef();
// // //   const peerConnection = useRef(null);

// // //   useEffect(() => {
// // //     console.log("Video Call Component Loaded");
// // //   }, []);

// // //   // Start Video Stream
// // //   const startVideo = async () => {
// // //     try {
// // //       const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// // //       myVideoRef.current.srcObject = userStream;
// // //       setStream(userStream);
// // //     } catch (error) {
// // //       console.error("Error accessing camera:", error);
// // //     }
// // //   };

// // //   // Create Call & Save Offer in Firestore
// // //   const createCall = async () => {
// // //     if (!stream) {
// // //       alert("Please start your video before creating a call!");
// // //       return;
// // //     }

// // //     peerConnection.current = new SimplePeer({ initiator: true, trickle: false, stream });

// // //     peerConnection.current.on("signal", async (signal) => {
// // //       try {
// // //         const docRef = await addDoc(collection(db, "calls"), { offer: JSON.stringify(signal) });
// // //         setCallId(docRef.id);
// // //         alert(`📞 Call Created! Share this ID: ${docRef.id}`);
// // //       } catch (error) {
// // //         console.error("Error creating call:", error);
// // //       }
// // //     });

// // //     peerConnection.current.on("stream", (peerStream) => {
// // //       peerVideoRef.current.srcObject = peerStream;
// // //     });

// // //     peerConnection.current.on("connect", () => {
// // //       alert("✅ Connection Established Successfully!");
// // //     });
// // //   };

// // //   // Join a Call Using Call ID
// // //   const joinCall = async () => {
// // //     if (!callId) {
// // //       alert("Please enter a valid Call ID!");
// // //       return;
// // //     }

// // //     const docRef = doc(db, "calls", callId);
// // //     const docSnap = await getDoc(docRef);

// // //     if (docSnap.exists()) {
// // //       const offer = JSON.parse(docSnap.data().offer);

// // //       peerConnection.current = new SimplePeer({ initiator: false, trickle: false, stream });

// // //       peerConnection.current.on("signal", async (signal) => {
// // //         try {
// // //           await addDoc(collection(db, "calls"), { answer: JSON.stringify(signal) });
// // //           console.log("Sent Answer:", signal);
// // //         } catch (error) {
// // //           console.error("Error sending answer:", error);
// // //         }
// // //       });

// // //       peerConnection.current.on("stream", (peerStream) => {
// // //         peerVideoRef.current.srcObject = peerStream;
// // //       });

// // //       // Signal the initiator with the received offer
// // //       peerConnection.current.signal(offer);

// // //       // Listen for the answer from Firestore
// // //       onSnapshot(docRef, (updatedDoc) => {
// // //         if (updatedDoc.exists() && updatedDoc.data().answer) {
// // //           peerConnection.current.signal(JSON.parse(updatedDoc.data().answer));
// // //         }
// // //       });

// // //       peerConnection.current.on("connect", () => {
// // //         alert("✅ Connection Established Successfully!");
// // //       });

// // //     } else {
// // //       alert("❌ Call ID not found!");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>📹 Simple Video Call App</h2>
      
// // //       <button onClick={startVideo}>🎥 Start Video</button>
// // //       <button onClick={createCall}>📞 Create Call</button>

// // //       <br />
// // //       {callId && (
// // //         <p>
// // //           <strong>Call ID: </strong> {callId}
// // //         </p>
// // //       )}

// // //       <input 
// // //         type="text" 
// // //         value={callId} 
// // //         placeholder="Enter Call ID to Join" 
// // //         onChange={(e) => setCallId(e.target.value)} 
// // //       />
      
// // //       <button onClick={joinCall}>🔗 Join Call</button>

// // //       <div>
// // //         <h3>My Video</h3>
// // //         <video ref={myVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid blue" }} />

// // //         <h3>Peer Video</h3>
// // //         <video ref={peerVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid green" }} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default VideoCall;

// // import React, { useEffect, useRef, useState } from "react";
// // import SimplePeer from "simple-peer";
// // import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
// // import { db } from "../firebase";

// // const VideoCall = () => {
// //   const [stream, setStream] = useState(null);
// //   const [callId, setCallId] = useState("");
// //   const myVideoRef = useRef();
// //   const peerVideoRef = useRef();
// //   const peerConnection = useRef(null);

// //   useEffect(() => {
// //     console.log("Video Call Component Loaded");
// //   }, []);

// //   // Start Video Stream
// //   const startVideo = async () => {
// //     try {
// //       const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //       myVideoRef.current.srcObject = userStream;
// //       setStream(userStream);
// //       console.log("🎥 Video stream started");
// //     } catch (error) {
// //       console.error("Error accessing camera:", error);
// //     }
// //   };

// //   // Create Call & Save Offer in Firestore
// //   const createCall = async () => {
// //     if (!stream) {
// //       alert("Please start your video before creating a call!");
// //       return;
// //     }

// //     peerConnection.current = new SimplePeer({ initiator: true, trickle: false, stream });

// //     peerConnection.current.on("signal", async (signal) => {
// //       try {
// //         const callRef = doc(collection(db, "calls"));
// //         await setDoc(callRef, { offer: JSON.stringify(signal) });

// //         setCallId(callRef.id);
// //         alert(`📞 Call Created! Share this ID: ${callRef.id}`);
// //         console.log("📡 Offer sent:", signal);
// //       } catch (error) {
// //         console.error("Error creating call:", error);
// //       }
// //     });

// //     peerConnection.current.on("stream", (peerStream) => {
// //       console.log("✅ Received peer stream");
// //       peerVideoRef.current.srcObject = peerStream;
// //     });

// //     peerConnection.current.on("connect", () => {
// //       alert("✅ Connection Established Successfully!");
// //       console.log("✅ Peer connection established");
// //     });
// //   };

// //   // Join a Call Using Call ID
// //   const joinCall = async () => {
// //     if (!callId) {
// //       alert("Please enter a valid Call ID!");
// //       return;
// //     }

// //     const callRef = doc(db, "calls", callId);
// //     const docSnap = await getDoc(callRef);

// //     if (docSnap.exists()) {
// //       const offer = JSON.parse(docSnap.data().offer);
// //       console.log("📡 Received offer:", offer);

// //       peerConnection.current = new SimplePeer({ initiator: false, trickle: false, stream });

// //       peerConnection.current.on("signal", async (signal) => {
// //         try {
// //           await setDoc(callRef, { answer: JSON.stringify(signal) }, { merge: true });
// //           console.log("📡 Sent answer:", signal);
// //         } catch (error) {
// //           console.error("Error sending answer:", error);
// //         }
// //       });

// //       peerConnection.current.on("stream", (peerStream) => {
// //         console.log("✅ Received peer stream");
// //         peerVideoRef.current.srcObject = peerStream;
// //       });

// //       peerConnection.current.signal(offer);

// //       // Listen for the answer from Firestore
// //       onSnapshot(callRef, (updatedDoc) => {
// //         if (updatedDoc.exists() && updatedDoc.data().answer) {
// //           const answer = JSON.parse(updatedDoc.data().answer);
// //           console.log("📡 Received answer:", answer);
// //           peerConnection.current.signal(answer);
// //         }
// //       });

// //       peerConnection.current.on("connect", () => {
// //         alert("✅ Connection Established Successfully!");
// //         console.log("✅ Peer connection established");
// //       });

// //     } else {
// //       alert("❌ Call ID not found!");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>📹 Simple Video Call App</h2>
      
// //       <button onClick={startVideo}>🎥 Start Video</button>
// //       <button onClick={createCall}>📞 Create Call</button>

// //       <br />
// //       {callId && (
// //         <p>
// //           <strong>Call ID: </strong> {callId}
// //         </p>
// //       )}

// //       <input 
// //         type="text" 
// //         value={callId} 
// //         placeholder="Enter Call ID to Join" 
// //         onChange={(e) => setCallId(e.target.value)} 
// //       />
      
// //       <button onClick={joinCall}>🔗 Join Call</button>

// //       <div>
// //         <h3>My Video</h3>
// //         <video ref={myVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid blue" }} />

// //         <h3>Peer Video</h3>
// //         <video ref={peerVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid green" }} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoCall;


// import React, { useEffect, useRef, useState } from "react";
// import SimplePeer from "simple-peer";
// import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";

// const VideoCall = () => {
//   const [stream, setStream] = useState(null);
//   const [callId, setCallId] = useState("");
//   const myVideoRef = useRef();
//   const peerVideoRef = useRef();
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     console.log("Video Call Component Loaded");
//   }, []);

//   const startVideo = async () => {
//     try {
//       const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       myVideoRef.current.srcObject = userStream;
//       setStream(userStream);
//       console.log("🎥 Video stream started");
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const createCall = async () => {
//     if (!stream) {
//       alert("Please start your video before creating a call!");
//       return;
//     }

//     peerConnection.current = new SimplePeer({ initiator: true, trickle: false, stream });

//     peerConnection.current.on("signal", async (signal) => {
//       try {
//         const callRef = doc(collection(db, "calls")); // Create a new document
//         await setDoc(callRef, { offer: JSON.stringify(signal) });

//         setCallId(callRef.id);
//         console.log("📡 Offer sent:", signal);

//         // ✅ Show Call ID in alert
//         alert(`📞 Call Created! Share this ID: ${callRef.id}`);
//       } catch (error) {
//         console.error("Error creating call:", error);
//       }
//     });

//     peerConnection.current.on("stream", (peerStream) => {
//       console.log("✅ Received peer stream");
//       peerVideoRef.current.srcObject = peerStream;
//     });

//     peerConnection.current.on("connect", () => {
//       alert("✅ Connection Established Successfully!");
//       console.log("✅ Peer connection established");
//     });
//   };

//   const joinCall = async () => {
//     if (!callId.trim()) {
//       alert("Please enter a valid Call ID!");
//       return;
//     }

//     const callRef = doc(db, "calls", callId);
//     const docSnap = await getDoc(callRef);

//     if (docSnap.exists()) {
//       const offer = JSON.parse(docSnap.data().offer);
//       console.log("📡 Received offer:", offer);

//       peerConnection.current = new SimplePeer({ initiator: false, trickle: false, stream });

//       peerConnection.current.on("signal", async (signal) => {
//         try {
//           await setDoc(callRef, { answer: JSON.stringify(signal) }, { merge: true });
//           console.log("📡 Sent answer:", signal);
//         } catch (error) {
//           console.error("Error sending answer:", error);
//         }
//       });

//       peerConnection.current.on("stream", (peerStream) => {
//         console.log("✅ Received peer stream");
//         peerVideoRef.current.srcObject = peerStream;
//       });

//       peerConnection.current.signal(offer);

//       // Listen for the answer from Firestore
//       onSnapshot(callRef, (updatedDoc) => {
//         if (updatedDoc.exists() && updatedDoc.data().answer) {
//           const answer = JSON.parse(updatedDoc.data().answer);
//           console.log("📡 Received answer:", answer);
//           peerConnection.current.signal(answer);
//         }
//       });

//       peerConnection.current.on("connect", () => {
//         alert("✅ Connection Established Successfully!");
//         console.log("✅ Peer connection established");
//       });

//     } else {
//       alert("❌ Call ID not found! Please check if the ID is correct.");
//     }
//   };

//   return (
//     <div>
//       <h2>📹 Simple Video Call App</h2>
      
//       <button onClick={startVideo}>🎥 Start Video</button>
//       <button onClick={createCall}>📞 Create Call</button>

//       <br />
//       {callId && (
//         <p>
//           <strong>Call ID: </strong> {callId}
//         </p>
//       )}

//       <input 
//         type="text" 
//         value={callId} 
//         placeholder="Enter Call ID to Join" 
//         onChange={(e) => setCallId(e.target.value)} 
//       />
      
//       <button onClick={joinCall}>🔗 Join Call</button>

//       <div>
//         <h3>My Video</h3>
//         <video ref={myVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid blue" }} />

//         <h3>Peer Video</h3>
//         <video ref={peerVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid green" }} />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;



import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const VideoCall = () => {
    const [stream, setStream] = useState(null);
    const [callId, setCallId] = useState("");
    const [peerStream, setPeerStream] = useState(null); // Store peer's stream
    const myVideoRef = useRef();
    const peerVideoRef = useRef();
    const peerConnection = useRef(null);

    useEffect(() => {
        console.log("Video Call Component Loaded");

        // Clean up peer connection on unmount
        return () => {
            if (peerConnection.current) {
                peerConnection.current.destroy();
            }
        };
    }, []);

    const startVideo = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            myVideoRef.current.srcObject = userStream;
            setStream(userStream);
            console.log("🎥 Video stream started");
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const createCall = async () => {
        if (!stream) {
            alert("Please start your video before creating a call!");
            return;
        }

        peerConnection.current = new SimplePeer({ initiator: true, trickle: false, stream });

        peerConnection.current.on("signal", async (signal) => {
            try {
                const callRef = doc(collection(db, "calls"));
                await setDoc(callRef, { offer: JSON.stringify(signal) });

                setCallId(callRef.id);
                console.log("📡 Offer sent:", signal);
                alert(`📞 Call Created! Share this ID: ${callRef.id}`);
            } catch (error) {
                console.error("Error creating call:", error);
            }
        });

        peerConnection.current.on("stream", (peerStream) => {
            console.log("✅ Received peer stream");
            setPeerStream(peerStream); // Store peer's stream in state
            peerVideoRef.current.srcObject = peerStream;
        });

        peerConnection.current.on("connect", () => {
            alert("✅ Connection Established Successfully!");
            console.log("✅ Peer connection established");
        });

        peerConnection.current.on("close", () => {
            console.log("Peer connection closed.");
            setPeerStream(null); // Clear peer stream
            if (peerVideoRef.current.srcObject) {
                peerVideoRef.current.srcObject = null; // Clear video element
            }
            alert("Call Ended");
        });

        peerConnection.current.on("error", (err) => {
            console.error("Peer connection error:", err);
            alert("Call Failed");
            setPeerStream(null);
            if (peerVideoRef.current.srcObject) {
                peerVideoRef.current.srcObject = null;
            }
        });
    };

    const joinCall = async () => {
        if (!callId.trim()) {
            alert("Please enter a valid Call ID!");
            return;
        }

        const callRef = doc(db, "calls", callId);
        const docSnap = await getDoc(callRef);

        if (docSnap.exists()) {
            const offer = JSON.parse(docSnap.data().offer);
            console.log("📡 Received offer:", offer);

            peerConnection.current = new SimplePeer({ initiator: false, trickle: false, stream });

            peerConnection.current.on("signal", async (signal) => {
                try {
                    await setDoc(callRef, { answer: JSON.stringify(signal) }, { merge: true });
                    console.log("📡 Sent answer:", signal);
                } catch (error) {
                    console.error("Error sending answer:", error);
                }
            });

            peerConnection.current.on("stream", (peerStream) => {
                console.log("✅ Received peer stream");
                setPeerStream(peerStream); // Store peer's stream in state
                peerVideoRef.current.srcObject = peerStream;
            });

            peerConnection.current.signal(offer);

            onSnapshot(callRef, (updatedDoc) => {
                if (updatedDoc.exists() && updatedDoc.data().answer) {
                    const answer = JSON.parse(updatedDoc.data().answer);
                    console.log("📡 Received answer:", answer);
                    peerConnection.current.signal(answer);
                }
            });

            peerConnection.current.on("connect", () => {
                alert("✅ Connection Established Successfully!");
                console.log("✅ Peer connection established");
            });

            peerConnection.current.on("close", () => {
                console.log("Peer connection closed.");
                setPeerStream(null); // Clear peer stream
                if (peerVideoRef.current.srcObject) {
                    peerVideoRef.current.srcObject = null; // Clear video element
                }
                alert("Call Ended");
            });

            peerConnection.current.on("error", (err) => {
                console.error("Peer connection error:", err);
                alert("Call Failed");
                setPeerStream(null);
                if (peerVideoRef.current.srcObject) {
                    peerVideoRef.current.srcObject = null;
                }
            });

        } else {
            alert("❌ Call ID not found! Please check if the ID is correct.");
        }
    };

    return (
        <div>
            <h2>📹 Simple Video Call App</h2>

            <button onClick={startVideo}>🎥 Start Video</button>
            <button onClick={createCall} disabled={!stream}>📞 Create Call</button> {/* Disable if no stream */}

            <br />
            {callId && (
                <p>
                    <strong>Call ID: </strong> {callId}
                </p>
            )}

            <input
                type="text"
                value={callId}
                placeholder="Enter Call ID to Join"
                onChange={(e) => setCallId(e.target.value)}
            />

            <button onClick={joinCall} disabled={!stream}>🔗 Join Call</button> {/* Disable if no stream */}

            <div>
                <h3>My Video</h3>
                <video ref={myVideoRef} autoPlay playsInline muted style={{ width: "300px", border: "2px solid blue" }} /> {/* muted added */}

                <h3>Peer Video</h3>
                <video ref={peerVideoRef} autoPlay playsInline style={{ width: "300px", border: "2px solid green" }} />
            </div>
        </div>
    );
};

export default VideoCall;
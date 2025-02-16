

import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

const VideoCall = () => {
  useEffect(() => {
    console.log("Came to video call");
  }, []);

  const [stream, setStream] = useState(null);
  const [callId, setCallId] = useState("");
  const [generatedCallId, setGeneratedCallId] = useState(""); // Store the created call ID
  const myVideoRef = useRef();
  const peerVideoRef = useRef();
  const peerConnection = useRef(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      myVideoRef.current.srcObject = stream;
      setStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // const createCall = async () => {
  //   peerConnection.current = new SimplePeer({ initiator: true, stream });

  //   peerConnection.current.on("signal", async (signal) => {
  //     const docRef = await addDoc(collection(db, "calls"), { offer: JSON.stringify(signal) });
  //     setCallId(docRef.id);
  //     setGeneratedCallId(docRef.id); // Save the generated Call ID for display
  //   });

  //   peerConnection.current.on("stream", (peerStream) => {
  //     peerVideoRef.current.srcObject = peerStream;
  //   });
  // };
  const createCall = async () => {
    peerConnection.current = new SimplePeer({ initiator: true, stream });

    peerConnection.current.on("signal", async (signal) => {
      try {
        const docRef = await addDoc(collection(db, "calls"), {
          offer: JSON.stringify(signal),
        });
        console.log("Generated Call ID:", docRef.id); // Debugging
        setCallId(docRef.id);
        setGeneratedCallId(docRef.id);
      } catch (error) {
        console.error("Error creating call:", error);
      }
    });

    peerConnection.current.on("stream", (peerStream) => {
      peerVideoRef.current.srcObject = peerStream;
    });
  };

  const joinCall = async () => {
    const docRef = doc(db, "calls", callId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      peerConnection.current = new SimplePeer({ initiator: false, stream });

      peerConnection.current.on("signal", async (signal) => {
        await addDoc(collection(db, "calls"), {
          answer: JSON.stringify(signal),
        });
      });

      peerConnection.current.on("stream", (peerStream) => {
        peerVideoRef.current.srcObject = peerStream;
      });

      peerConnection.current.signal(JSON.parse(docSnap.data().offer));

      onSnapshot(docRef, (updatedDoc) => {
        if (updatedDoc.data().answer) {
          peerConnection.current.signal(JSON.parse(updatedDoc.data().answer));
        }
      });
    } else {
      alert("Call ID not found!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCallId);
    alert("Call ID copied to clipboard!");
  };

  return (
    <div>
      <h2>Simple Video Call App</h2>
      <button onClick={startVideo}>Start Video</button>
      <button onClick={createCall}>Create Call</button>

      {/* Show the generated Call ID after creating a call */}
      {generatedCallId && (
        <div>
          <p>
            <strong>Call ID:</strong> {generatedCallId}
          </p>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}

      <input
        type="text"
        value={callId}
        placeholder="Enter Call ID"
        onChange={(e) => setCallId(e.target.value)}
      />
      <button onClick={joinCall}>Join Call</button>

      <div>
        <video
          ref={myVideoRef}
          autoPlay
          playsInline
          style={{ width: "300px" }}
        />
        <video
          ref={peerVideoRef}
          autoPlay
          playsInline
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
};

export default VideoCall;

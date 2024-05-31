import toast from "react-hot-toast";

export async function upload(ev, callbackfn){
    const file = ev.target.files?.[0];
    if (file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const data = new FormData();
        data.set("file", file);
        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.ok) {
            response.json().then((link) => {
              callbackfn(link)
              resolve(link);
            });
          } else {
            reject();
          }
        });
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Uploaded successfully",
        error: "Failed to upload",
      });
    }
  }
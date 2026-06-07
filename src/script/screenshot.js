const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const path = require("path");
const fs = require("fs");

// Importing dialog module using remote
const dialog = electron.remote.dialog;

// let win = BrowserWindow.getAllWindows()[0];
const win = BrowserWindow.getFocusedWindow();

var screenshot = document.getElementById("screenshot");
screenshot.addEventListener("click", (event) => {
  win.webContents
    .capturePage({
      x: 0,
      y: 0,
      width: Math.round((window.innerWidth * 79) / 100),
      height: Math.round(window.innerHeight),
    })
    .then((img) => {
      dialog
        .showSaveDialog({
          title: "Enregistrement du glyphe",

          // Default path to assets folder
          defaultPath: path.join(__dirname, "../assets/glyphe.png"),

          // defaultPath: path.join(__dirname,
          // '../assets/image.jpeg'),
          buttonLabel: "Enregistrer",

          // Restricting the user to only Image Files.
          filters: [
            {
              name: "Image Files",
              extensions: ["png", "jpeg", "jpg"],
            },
          ],
          properties: [],
        })
        .then((file) => {
          // Stating whether dialog operation was
          // cancelled or not.
          console.log(file.canceled);
          if (!file.canceled) {
            console.log(file.filePath.toString());

            // Creating and Writing to the image.png file
            // Can save the File as a jpeg file as well,
            // by simply using img.toJPEG(100);
            fs.writeFile(
              file.filePath.toString(),
              img.toPNG(),
              "base64",
              (err) => {
                if (err) throw err;
                console.log("Saved!");
              },
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// GSAP
window.onload = () => {
  setTimeout(() => {
    document.body.classList.add("display");

    const wrapper = document.querySelector(".content-wrapper");

    gsap.from(wrapper, {
      duration: 2.5,
      scale: 0.5,
      opacity: 0,
      ease: "power3.out",
    });
  }, 4000);
};

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".content-wrapper");

  function hoverIn() {
    if (!wrapper.classList.contains("new-content")) {
      gsap.to(wrapper, {
        duration: 0.3,
        scale: 1.05,
        opacity: 0.9,
        ease: "power1.out",
      });
    }
  }

  function hoverOut() {
    if (!wrapper.classList.contains("new-content")) {
      gsap.to(wrapper, {
        duration: 0.3,
        scale: 1,
        opacity: 0.5,
        ease: "power1.out",
      });
    }
  }

  wrapper.addEventListener("mouseenter", hoverIn);
  wrapper.addEventListener("mouseleave", hoverOut);
});

// Puzzle functional
document.getElementById("fileInput").addEventListener("change", function () {
  const fileName = document.getElementById("fileName");
  if (this.files.length > 0) {
    fileName.textContent = `Selected file: ${this.files[0].name}`;
  } else {
    fileName.textContent = "";
  }
});

function processFile() {
  const fileInput = document.getElementById("fileInput");
  const resultDiv = document.getElementById("result");

  if (!fileInput.files.length) {
    alert("Choose the file!");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const fragments = event.target.result
      .split("\n")
      .map((line) => line.trim());

    if (!validateFile(fragments)) {
      alert(
        "Invalid file content! Ensure the file contains only numerical strings with correct formatting."
      );
      return;
    }

    const longestChain = findLongestChain(fragments);
    resultDiv.innerHTML =
      '<span class="highlight">Longest sequence:</span> ' + longestChain;
  };

  reader.readAsText(file);
}

function validateFile(fragments) {
  const validFormat = /^[0-9]+$/;
  for (const fragment of fragments) {
    if (!validFormat.test(fragment)) {
      return false;
    }
  }
  return true;
}

function findLongestChain(fragments) {
  let longest = "";

  for (let i = 0; i < fragments.length; i++) {
    let chain = fragments[i];
    let last2Digits = fragments[i].slice(-2);

    for (let j = 0; j < fragments.length; j++) {
      if (i !== j && fragments[j].slice(0, 2) === last2Digits) {
        chain += fragments[j].slice(2);
        last2Digits = fragments[j].slice(-2);
      }
    }

    if (chain.length > longest.length) {
      longest = chain;
    }
  }

  return longest;
}

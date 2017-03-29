function question(question) {
  console.log(question);
  return new Promise(function (resolve) {
    process.stdin.once('data', function (data) {
      resolve(data.toString().trim());
    });
  });
}

export default question;
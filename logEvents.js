const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (msg) => {
  const data = `${format(new Date(), "yyyyMMdd\tHH:MM:SS")}`;
  const logItem = `${data}\t${uuid()}\t${msg}`;
  console.log(logItem);
  try {
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventlogs.txt"),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

console.log(uuid());

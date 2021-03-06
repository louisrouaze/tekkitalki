const Command = require('./commandModel');
const commandController = {};

commandController.findCommand = (req, res) => {
    let text = new RegExp(req.query.command);
    Command.findOne({ commandString: text }, (err, result) => {
      if (err) console.log(err);
      if (result) res.send(result);
      else res.send('NA');
    });
};

commandController.addCommand = (req, res) => {
    let cmdToSave = req.body;
    let command = new Command(cmdToSave);
    command.save((err) => {
        if (err) {
          // console.log(err);
          res.send(err);
        }
        else {
          // console.log("Saved successfully");
          res.send({'Message':'Success'});
        }
    });
};

commandController.findAll = (req, res) => {
    Command.find({}, (err, result) => {
        if (err) console.log(err);
        let flatArr = result.reduce((acc, curr) => {
            return acc = acc.concat(curr.commands);
        },[]);
        res.send(flatArr);
    });
};


module.exports = commandController;

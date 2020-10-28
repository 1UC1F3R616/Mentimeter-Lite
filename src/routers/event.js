const express = require("express");
const date = require("date-and-time");

const Event = require("../models/event");
const Question = require("../models/question");
const Option = require("../models/option");

const authUser = require("../middleware/authUser");

app = express();
app.use(express.json());

router = new express.Router();

router.get("/event", (req, res) => {
    res.json({ message: "Event Amigo!" });
});

// create event: post
router.post("/create/event", authUser, async (req, res) => {
    // console.log(req.body)
    // res.send("authorized")
    try {
        function makeid(length) {
            var result = "";
            var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        }

        const otp = makeid(6);
        let count = 0;
        while (true) {
            const event = Event.find({ otp });
            if (event || count > 99) {
                break
            }
            otp = otp.concat(makeid(2));
        }

        let addMinutes = req.body.valid_upto_date;
        if (addMinutes && addMinutes > 1 && addMinutes < 120) {
            var event = new Event({
                user_id: req.user._id,
                name: req.body.name,
                description: req.body.description,
                otp: otp,
                valid_upto_date: date.addMinutes(new Date(), addMinutes),
            });
        } else {
            var event = new Event({
                user_id: req.user._id,
                name: req.body.name,
                description: req.body.description,
                otp: otp,
            });
        }

        await event.save();

        res.status(201).json(event);
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
});

// fetch past events: get
router.get("/events", authUser, async (req, res) => {
    try {
        const events = await Event.find({ user_id: req.user._id });
        res.status(200).json(events);
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
});

// fetch this event: get
router.get("/events/:id", authUser, async (req, res) => {
    try {
        const event = await Event.find({
            user_id: req.user._id,
            _id: req.params.id,
        });
        res.status(200).json(event);
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
});

// fetch event by otp
router.get("/events/otp/:otp", async (req, res) => {
    try {
        const event = await Event.findOne({
            otp: req.params.otp
        });
        res.status(200).json(event);
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
});

// fetch all questions with options and return json when an event otp is provided
router.get('/events/questions/:otp', async (req, res) => {
    try {
        const event = await Event.findOne({otp: req.params.otp})
        
        if (event == null) {
            console.log(`This otp is null ${req.params.otp}`)
            res.status(404).json({})
        }
        
        else {
            const questions = await Question.find({'event_id': event._id}) // Array of questions

        let result = {}

        for (let i=0; i<questions.length; i++) {
            options = await Option.find({'question_id': questions[i]._id})

            result[questions[i].number] = {'question': questions[i]}

            result[questions[i].number]['options'] = []
            for (let j=0; j<options.length; j++) {
                // options.push(options[j])
                result[questions[i].number]['options'].push(options[j])
            }
        }

        res.status(200).send(result)
        }
        
        
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
})

////////////////////////export///////////////////////
module.exports = router;

// const test = async () => {
//     const event = await Event.findById({_id: '5f80cfd579337d4bf85324af'})
//     await event.populate('user_id').execPopulate()
//     console.log(event.user_id)
// }

// test()

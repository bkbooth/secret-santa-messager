# 🤫🎅 Secret Santa Messager

A command-line Secret Santa organiser with SMS messaging.

## Usage

Setup your [Twilio](https://www.twilio.com/) config by copying `env.example` to `.env` and setting the required variable names.
Alternatively you can set them as real environment variables when running the command.

By default no SMS messages will be sent, you must set the environment variable `SEND_MESSAGES=true` when running a "live" command.

Setup a [data file](#the-data-file) for the Secret Santa gift group similar to the one shown in the [example](#example-data-file) below.

```sh
$ node index.js -f data.json -g "Your Family Secret Santa"
```

## The data file

The data file should be a JSON file which contains an array of objects representing each gifter in the gift group.
Each gifter object should include:

- `id` - A unique ID for the gifter
- `firstName` - The first name of the gifter
- `lastName` - The last name of the gifter
- `phoneNumber` - The phone number of the gifter. Must be in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.
- `exclusions` - An array of gifter ID's from the group that this gifter should not give to (eg. spouse or partner)

### Example data file

```json
[
  {
    "id": "f4eb0de4-c1a8-44b0-9b1b-d499b6cc1372",
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "+6112345678",
    "exclusions": ["e18d90fb-b904-4aad-b317-75e9d02b3854"]
  },
  {
    "id": "e18d90fb-b904-4aad-b317-75e9d02b3854",
    "firstName": "Jane",
    "lastName": "Smith",
    "phoneNumber": "+61409876543",
    "exclusions": ["f4eb0de4-c1a8-44b0-9b1b-d499b6cc1372"]
  },
  {
    "id": "5db8afc5-1959-4103-a434-2a64f883ec81",
    "firstName": "Sarah",
    "lastName": "Jones",
    "phoneNumber": "+61411223344",
    "exclusions": []
  },
  {
    "id": "5dd21c5e-a0fe-4860-be2e-8113f138a74d",
    "firstName": "Thomas",
    "lastName": "Porter",
    "phoneNumber": "+61455667788",
    "exclusions": []
  }
]
```

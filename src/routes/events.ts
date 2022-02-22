import { Static, Type } from "@sinclair/typebox";
import { getUnixTime } from "date-fns";
import { FastifyInstance } from "fastify";
import { v4 as uuid } from "uuid";
import Event from "../interfaces/event.js";
import Person from "../interfaces/Person.js";
import {
  collections,
  findOneEntire,
  insertOne,
  updateOne,
} from "../lib/mongo/index.js";

export default async function routes(fastify: FastifyInstance) {
  const eventIdSchema = Type.Object({
    eventId: Type.String(),
  });
  type EventIdType = Static<typeof eventIdSchema>;

  fastify.get<{ Params: EventIdType }>(
    "/:eventId",
    { schema: { params: eventIdSchema } },
    async (request, reply) => {
      const { eventId } = request.params;

      const event = await findOneEntire(collections.events, { id: eventId });

      return event;
    }
  );

  const createEventSchema = Type.Object({
    name: Type.String(),
    minTime: Type.Number(),
    maxTime: Type.Number(),
    days: Type.Array(Type.Number()),
  });
  type CreateEventType = Static<typeof createEventSchema>;

  fastify.post<{ Body: CreateEventType }>(
    "/",
    { schema: { body: createEventSchema } },
    async (request, reply) => {
      const { name, minTime, maxTime, days } = request.body;

      const event: Event = {
        id: uuid(),
        createdDate: getUnixTime(new Date()),
        name: name,
        minTime: minTime,
        maxTime: maxTime,
        days: days,
      };

      await insertOne(collections.events, event);

      return event;
    }
  );

  const updateFreeTimeSchema = Type.Object({
    name: Type.String(),
    freeTime: Type.Array(Type.Object({ s: Type.Number(), e: Type.Number() })),
  });
  type UpdateFreeTimeType = Static<typeof updateFreeTimeSchema>;

  fastify.post<{ Body: UpdateFreeTimeType; Params: EventIdType }>(
    "/:eventId/freeTime",
    { schema: { body: updateFreeTimeSchema, params: eventIdSchema } },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, freeTime } = request.body;

      const event = await findOneEntire(collections.events, { id: eventId });

      let person: Person;
      if (event.people) {
        const matches = event.people.filter((personData) => {
          return personData.name === name;
        });
        if (matches.length >= 1) {
          person = matches[0];
          person.freeTime = freeTime;
        } else {
          person = {
            name: name,
            freeTime: freeTime,
          };
        }
      } else {
        person = { name: name, freeTime: freeTime };
      }

      let newPeople: Person[];
      if (event.people) {
        newPeople = event.people.filter(function (obj) {
          return obj.name !== name;
        });
      } else {
        newPeople = [];
      }

      newPeople.push(person);

      if (event.people) {
        await updateOne(
          collections.events,
          { id: eventId },
          { $set: { people: newPeople } }
        );
      } else {
        await updateOne(
          collections.events,
          { id: eventId },
          { $set: { people: newPeople } }
        );
      }
    }
  );
}

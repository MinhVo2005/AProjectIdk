import cron from "node-cron";
import Room from "../model/room.model";
import User from "../model/user.model";

async function deleteEmptyRoom() {
    const cutoff  = new Date(Date.now() - 1000* 60 * 60)// 1 hours
    try {
        const result = await Room.find({
            messages: [],
            updatedAt: {$lt: cutoff}
        })
        if (result.length===0) {
            console.log("empty");
            return
        };
        const roomIds = result.map(room => room._id);

        await Room.deleteMany({
            _id: {$in: roomIds}  
        })

        await User.updateMany({
            rooms: {$in: roomIds},
        },
           { $pull: {rooms: {$in: roomIds}}} 
    )
     console.log(`Cleaned up ${roomIds.length} inactive rooms.`);

    } catch (error) {
        console.log("Error in deleteEmptyRoom in cron.ts", error);
    }
}
const task = cron.createTask('0 * * * *', deleteEmptyRoom)

export default task;
import { supabase } from "../supabase";

let getTodoItems = async () => {
    let { data, error } = await supabase.from("todo_items").select();

    if (error) {
        console.log(error);
    }

    return data;
};

export { getTodoItems };

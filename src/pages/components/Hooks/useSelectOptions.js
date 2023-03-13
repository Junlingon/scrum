import { useSelector } from "react-redux";
import { select_orgs, select_users } from "../../../redux/slice/project";
import { select_epic_list } from '../../../redux/slice/kanban';

function useSelectOptions() {

    const orgs = useSelector(select_orgs)
    const users = useSelector(select_users)
    const epic_list = useSelector(select_epic_list) || []

    const orgs_options = orgs.map((item) => {
        return {
            value: item.name,
            label: item.name
        }
    })

    const users_options = users.map((item) => {
        return {
            value: item.username,
            label: item.username
        }
    })

    const task_options = [
        {
            value: 'task',
            label: 'task',
        },
        {
            value: 'bug',
            label: 'bug',
        },
    ]

    const epic_options = epic_list.map((key) => {
        return {
            value: key,
            label: key
        }
    })

    return {
        orgs_options,
        users_options,
        task_options,
        epic_options
    }
}

export default useSelectOptions;
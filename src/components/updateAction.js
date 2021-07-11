export default function updateAction(state, payload) {
    console.log("state:", state);
    console.log("payload:", payload);
    return {
        ...state,
        data: {
            ...state.data,
            ...payload,
        },
    };
}
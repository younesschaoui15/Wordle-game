export const getRandomSolution = (list) => {
    if (!list || list.length === 0) return;

    const randomPositionInList = Math.floor(Math.random() * list?.length);

    return list[randomPositionInList];
};
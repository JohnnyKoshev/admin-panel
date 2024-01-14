interface IPost {
    body: string;
    id: number;
    reactions: number;
    tags: string[];
    title: string;
    userId: number;
}

export default IPost;
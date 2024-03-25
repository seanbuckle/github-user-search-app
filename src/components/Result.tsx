function Result() {
    const url: string = "https://api.github.com/users/octocat";
    fetch(url)
    .then((response: Response) => response.json())
    .then((data: Response) => {// Specify the type of 'data' parameter
        const result: HTMLElement | null = document.getElementById("result");
        if (result) {
            result.innerHTML = `<h1>${JSON.stringify(data, null, 2)}</h1>`;
                }
        });
    
    return (
        <>
            <section className="result" id="result"></section>
            Joined Repos Followers Following
        </>
    );
}

export default Result;

export default function Pagination({ page, totalPages, setPage }) {
    const maxVisible = 5;
    

    function getPages() {
        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ⏮
            </button>

            {/* PREVIOUS */}
            <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ◀
            </button>

            {/* PAGE BUTTONS */}
            {getPages().map(p => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 border rounded ${
                        p === page ? "bg-purple-500 text-white" : "hover:bg-gray-200"
                    }`}
                >
                    {p}
                </button>
            ))}

            {/* NEXT */}
            <button
                onClick={() => setPage(p => Math.min(p + 1, 20))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ▶
            </button>
            <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ⏭
            </button>

        </div>
    );
}

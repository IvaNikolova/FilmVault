import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

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
            {/* FIRST PAGE */}
            <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-30 hover:bg-gray-100 transition"
            >
                <ChevronsLeft size={18} />
            </button>

            {/* PREVIOUS */}
            <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-30 hover:bg-gray-100 transition"
            >
                <ChevronLeft size={18} />
            </button>

            {/* PAGE BUTTONS */}
            {getPages().map(p => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm font-medium transition
                    ${
                        p === page
                        ? "bg-gray-900 text-white border-gray-900 shadow"
                        : "hover:bg-gray-100 border-gray-600"
                    }`}
                >
                    {p}
                </button>
            ))}

            {/* NEXT */}
            <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-30 hover:bg-gray-100 transition"
            >
                <ChevronRight size={18} />
            </button>

            {/* LAST PAGE */}
            <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-30 hover:bg-gray-100 transition"
            >
                <ChevronsRight size={18} />
            </button>
        </div>
    );
}

export function TokenTableSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-right">Price</th>
            <th className="px-3 py-2 text-right">24h %</th>
            <th className="px-3 py-2 text-right">Liquidity</th>
            <th className="px-3 py-2 text-right">Mkt Cap</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr key={i} className="border-t border-slate-800">
              <td className="px-3 py-3">
                <div className="h-3 w-32 bg-slate-800 rounded animate-pulse mb-2" />
                <div className="h-2 w-16 bg-slate-900 rounded animate-pulse" />
              </td>
              <td className="px-3 py-3 text-right">
                <div className="h-3 w-20 bg-slate-800 rounded animate-pulse" />
              </td>
              <td className="px-3 py-3 text-right">
                <div className="h-3 w-16 bg-slate-800 rounded animate-pulse" />
              </td>
              <td className="px-3 py-3 text-right">
                <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
              </td>
              <td className="px-3 py-3 text-right">
                <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

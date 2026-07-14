import type { TypographySample } from "@/data/typography-samples"

const TABLE_TH =
  "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
const TABLE_TD =
  "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
const TABLE_ROW = "m-0 border-t p-0 even:bg-muted"

export function TypographySamplePreview({ sample }: { sample: TypographySample }) {
  switch (sample.id) {
    case "blockquote":
      return (
        <blockquote className={sample.className}>
          &quot;After all,&quot; he said, &quot;everyone enjoys a good joke.&quot;
        </blockquote>
      )

    case "list":
      return (
        <ul className={sample.className}>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners: 20 gold coins</li>
        </ul>
      )

    case "table":
      return (
        <div className="w-full overflow-x-auto">
          <table className={sample.className}>
            <thead>
              <tr className={TABLE_ROW}>
                <th className={TABLE_TH}>King&apos;s Treasury</th>
                <th className={TABLE_TH}>People&apos;s happiness</th>
              </tr>
            </thead>
            <tbody>
              <tr className={TABLE_ROW}>
                <td className={TABLE_TD}>Empty</td>
                <td className={TABLE_TD}>Overflowing</td>
              </tr>
              <tr className={TABLE_ROW}>
                <td className={TABLE_TD}>Modest</td>
                <td className={TABLE_TD}>Satisfied</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

    case "inline-code":
      return <code className={sample.className}>@radix-ui/react-alert-dialog</code>

    case "lead":
      return (
        <p className={sample.className}>
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
      )

    case "large":
      return <div className={sample.className}>Are you absolutely sure?</div>

    default: {
      const Tag = sample.tag
      return <Tag className={sample.className}>{sample.children}</Tag>
    }
  }
}

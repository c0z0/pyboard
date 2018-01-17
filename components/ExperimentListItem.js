import React from 'react'
import Link from 'next/link'

const ExperimentListItem = ({ name, id }) => (
  <Link href={`/experiment?id=${id}`} as={`/experiment/${id}`}>
    <div className="container">
      <p>{name}</p>
      <style jsx>{`
        p {
          padding: 12px 12px;
          margin: 0;
        }

        .container {
          transition: all 0.1s;
        }

        .container:not(:last-child) {
          border-bottom: 1px #ddd solid;
        }

        .container:hover {
          background: #fafafa;
          cursor: pointer;
        }
      `}</style>
    </div>
  </Link>
)
export default ExperimentListItem

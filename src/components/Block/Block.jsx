import React, { memo, useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import classes from './Block.module.css';
import BlockText from './Blocks/TextBlock/TextBlock';
import DraggableContainer from './DraggableContainer/DraggableContainer';
import PageBlock from './Blocks/PageBlock/PageBlock';
import WorkSpaceBlock from './Blocks/WorkSpaceBlock/WorkSpaceBlock';
import FolderBlock from './Blocks/FolderBlock/FolderBlock';

import { notesClient } from '../../client/client';


const Block = ({ id, onError, inline=false, ...props }) => {
  const [block, setBlock] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    notesClient
      .get("/block/" + id)
      .then((response) => {
        data = JSON.parse(JSON.stringify(data));

        setBlock(data);

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      })
  }, []);

  if (block === null) {
    return (
      <div className={classes.wrap}>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.wrap}>
        <LoadingOutlined style={{ fontSize: 24 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.wrap}>
        Error fetching block: {error.message}
      </div>
    );
  }

  return (
    <div className={classes.wrap}>
      {
        {
          "text": <BlockText block={block} />,
          "page": <PageBlock block={block} inline={inline}/>,
          "workspace": <WorkSpaceBlock block={block} inline={inline}/>,
          "folder": <FolderBlock block={block} inline/>
        }[block.type]
      }
    </div>
  );
};

export default memo(Block);

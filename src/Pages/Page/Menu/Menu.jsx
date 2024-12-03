import React, { useEffect, useState } from 'react';
import { SettingOutlined, UserOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Flex, Menu } from 'antd';

import MenuItem from 'antd/es/menu/MenuItem';
import { useParams } from 'react-router-dom';


const WorkSpaceMenu = () => {
  const [workspaceId, setWorkspaceId] = useState(null);
  const [items, setItems] = useState([]);
  const { pageId } = useParams();

  const fetchData = async (id) => {
    return new Promise((resolve, reject) => {
      notesClient
        .get("/block/" + id)
      
      notesClient.getBlockRouteBlockIdGet(id, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  const generateItems = async (id) => {
    const data = await fetchData(id);

    const item = {
      key: data.id,
      icon: data.type === 'folder' ? <FolderOutlined /> : null,
      label: data.type === 'folder' ? data.properties.title : <a href={"/app/page/" + data.id}>{data.properties.title}</a>,
      children: [],
    };

    if (data.content && data.content.length > 0) {
      for (const contentId of data.content) {
        const child = await fetchData(contentId);

        if (child.type != 'folder' && child.type != 'page')
          continue;

        const childItem = await generateItems(contentId);

        item.children.push(childItem);
      }
    }

    if (item.children.length === 0) {
      item.children = null
    }

    return item;
  };

  const fetchWsData = async () => {
    return new Promise((resolve, reject) => {
      workspaceApiInstance.getWorkspaceRouteWorkspaceGet((error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchWsData();

      const data_in_json = await generateItems(data.id);

      const children = data_in_json.children;

      setItems([
        {
          key: 'main-group',
          label: 'Custom Notion',
          type: 'group',
          children: [
            {
              key: 'account',
              icon: <UserOutlined/>,
              label: <a href='/app/account'>Account</a>,
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: 'Settings',
            }
          ]
        },
        {
          key: 'workspace-group',
          label: 'Workspace',
          type: 'group',
          children: children
        }
      ]);
    }

    load();
  }, []);

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  
  const [stateOpenKeys, setStateOpenKeys] = useState([pageId]);

  const onOpenChange = (openKeys) => {
    const levelKeys = getLevelKeys(items);
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Flex vertical>
      <Menu
        mode="inline"
        label="Workspaces"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
          height: "-webkit-fill-available",
        }}
        items={items}
      />
    </Flex>
  );
};

export default WorkSpaceMenu;
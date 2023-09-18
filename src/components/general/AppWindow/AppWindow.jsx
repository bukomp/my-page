import React, { useState } from 'react';
import './AppWindow.css';
import { useDispatch } from 'react-redux';
import { removeFromAppsList } from '../../../reducers/appsListReducer';

const AppWindow = ({ appName, AppComponent }) => {
  const dispatch = useDispatch();

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 400, height: 400 });
  const [rel, setRel] = useState(null);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    setRel({
      x: e.pageX - pos.x,
      y: e.pageY - pos.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    setDragging(false);
    setResizing(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging && !resizing) return;
    if (dragging) {
      setPos({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y,
      });
    }
    if (resizing) {
      setSize({
        width: e.pageX - pos.x + 5,
        height: e.pageY - pos.y - 42,
      });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const onResizeMouseDown = (e) => {
    if (e.button !== 0) return;
    setResizing(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onClose = () => {
    dispatch(removeFromAppsList(appName));
  };

  return (
    <div
      className="app-window"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
      }}
    >
      <div
        className="app-window-header"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {/* Insert the component that should be draggable here */}
        <h1>{appName || 'Temporary app name'}</h1>
        <button className="app-window-close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div
        className="app-window-content"
        style={{ width: size.width, height: size.height }}
      >
        {/* Insert the content of the window here */}
        {AppComponent || <p>This is some temporary content for the app.</p>}
      </div>
      <div
        className="app-window-resize-handle"
        onMouseDown={onResizeMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      ></div>
    </div>
  );
};

export default AppWindow;

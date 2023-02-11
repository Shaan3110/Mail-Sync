import { Alert, AlertTitle, Button, ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  addEdge,
} from "reactflow";
import RestoreIcon from '@mui/icons-material/Restore';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import "reactflow/dist/style.css";
import { useRef } from "react";
import { useState } from "react";


const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "molecule" },
    position: { x: 0, y: 50 },
    style: { backgroundColor: '#696cff', color: 'white',borderRadius:"5px"}
  },
];

const flowKey = 'main-flow';

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project,setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {

      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
      restoreFlow();
    }, [setNodes, setViewport]);
    
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        let nodeName = prompt("Name of the node");
        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          position: project({
            x: event.clientX - left - 75,
            y: event.clientY - top,
          }),
          data: { label: nodeName },
          style: { backgroundColor: '#696cff', color: 'white',borderRadius:"5px"}
          
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id,type: 'step' })
        );
      }
    },
    [project]
  );

  return (
    <Box
      sx={{ width: "100%", height: "80vh" }}
      display="flex"
      flexDirection={"column"}
      ref={reactFlowWrapper}
      id="download-image"
    >
      <ButtonGroup style={{ alignSelf: "flex-end" }}>
      <Button
          variant="contained"
          size="large"
          style={{
            fontWeight: "bold",
            textTransform: "none",
            margin: "15px 5px",
          }}
          endIcon={<RestoreIcon />}
          onClick={onRestore}
        >
          Undo
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{
            fontWeight: "bold",
            textTransform: "none",
            margin: "15px 5px",
          }}
          endIcon={<SaveIcon />}
          onClick={onSave}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{
            fontWeight: "bold",
            textTransform: "none",
            margin: "15px 5px",
          }}
          onClick={() => {
            setNodes(initialNodes)
            setEdges([])
          }}
        >
          Clear All
        </Button>
      </ButtonGroup>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={fitViewOptions}
        onInit={setRfInstance}
        >
         <Background color="#696cff"  />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Controls /> 
          </ReactFlow>
      <Alert
        severity="info"
        style={{ alignSelf: "flex-end", marginTop: "30px" }}
      >
        <AlertTitle fontWeight="bolder">Help</AlertTitle>
        Delete any node by clicking on it <strong>and tapping backspace</strong>
      </Alert>
    </Box>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);

// export default Flow;

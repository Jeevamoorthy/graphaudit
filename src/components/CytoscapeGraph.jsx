import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, Info, CheckSquare } from 'lucide-react';

export default function CytoscapeGraph({
  graphData,
  highlightedNodes = [],
  highlightedEdges = [],
  showExplanations = false,
  selectedNodes = [],
  onToggleNodeSelect = () => {},
  readOnly = false
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !graphData) return;

    // Destroy existing instance if any
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const elements = [
      ...graphData.nodes.map(n => {
        const isModelHighlighted = showExplanations && highlightedNodes.includes(n.id);
        const isUserSelected = selectedNodes.includes(n.id);

        return {
          data: {
            id: n.id,
            label: n.label || n.id,
            balance: n.balance || '$0',
            age: n.age || 'N/A',
            txCount: n.txCount || n.transactions || 1,
            isModelHighlighted,
            isUserSelected,
            type: n.type || 'normal'
          }
        };
      }),
      ...graphData.edges.map(e => {
        const isModelHighlighted = showExplanations && highlightedEdges.includes(e.id);

        return {
          data: {
            id: e.id,
            source: e.source,
            target: e.target,
            amount: e.amount || '',
            time: e.time || '',
            isModelHighlighted
          }
        };
      })
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      boxSelectionEnabled: false,
      autounselectify: true,
      layout: {
        name: 'cose',
        animate: false,
        padding: 40,
        nodeRepulsion: 6500,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        gravity: 0.25,
        numIter: 350
      },
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#cbd5e1',
            'font-family': 'Inter, sans-serif',
            'font-size': '11px',
            'font-weight': '600',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'background-color': '#1e293b',
            'border-width': 2,
            'border-color': '#475569',
            'width': 34,
            'height': 34,
            'transition-property': 'background-color, border-color, width, height',
            'transition-duration': '0.2s'
          }
        },
        {
          selector: 'node[?isModelHighlighted]',
          style: {
            'background-color': '#7f1d1d',
            'border-color': '#f87171',
            'border-width': 3.5,
            'color': '#fca5a5',
            'width': 38,
            'height': 38,
            'shadow-blur': 12,
            'shadow-color': '#ef4444',
            'shadow-opacity': 0.6
          }
        },
        {
          selector: 'node[?isUserSelected]',
          style: {
            'border-color': '#38bdf8',
            'border-width': 4,
            'background-color': '#0369a1',
            'color': '#38bdf8',
            'width': 40,
            'height': 40
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#334155',
            'target-arrow-color': '#334155',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.1,
            'opacity': 0.75
          }
        },
        {
          selector: 'edge[?isModelHighlighted]',
          style: {
            'width': 3.5,
            'line-color': '#f87171',
            'target-arrow-color': '#f87171',
            'opacity': 1,
            'z-index': 10
          }
        }
      ]
    });

    cy.on('tap', 'node', function (evt) {
      const node = evt.target;
      const data = node.data();
      setActiveNode(data);
    });

    cy.on('tap', function (evt) {
      if (evt.target === cy) {
        setActiveNode(null);
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [graphData, showExplanations, highlightedNodes, highlightedEdges]);

  // Synchronize dynamic user selections without re-running entire cose layout
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;
    cy.batch(() => {
      cy.nodes().forEach(node => {
        const id = node.data('id');
        const isSel = selectedNodes.includes(id);
        node.data('isUserSelected', isSel);
      });
    });
  }, [selectedNodes]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 35);
  const handleReset = () => {
    if (!cyRef.current) return;
    cyRef.current.reset();
    cyRef.current.fit(undefined, 35);
  };

  return (
    <div className="relative w-full h-[460px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner flex flex-col">
      {/* Top Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 shadow-md">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-3 bg-slate-700 mx-0.5" />
        <button
          onClick={handleFit}
          title="Fit View"
          className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          title="Reset"
          className="p-1 hover:text-white hover:bg-slate-800 rounded transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Graph Legend */}
      <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-3 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[11px] text-slate-400 shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500 inline-block"></span>
          <span>Account</span>
        </div>
        {showExplanations && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-800 border-2 border-red-400 inline-block"></span>
            <span className="text-red-300 font-medium">Model Highlight</span>
          </div>
        )}
        {!readOnly && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-600 border-2 border-sky-400 inline-block"></span>
            <span className="text-sky-300 font-medium">Tagged by You</span>
          </div>
        )}
      </div>

      {/* Cytoscape Canvas */}
      <div ref={containerRef} className="cytoscape-container flex-1" />

      {/* Selected Node Details Drawer */}
      {activeNode && (
        <div className="absolute top-3 right-3 z-10 w-72 bg-slate-950/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-700 shadow-2xl text-xs space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <span className="font-semibold text-slate-100">{activeNode.label}</span>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-slate-400 hover:text-white"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Balance</span>
              <span className="font-mono font-medium text-slate-200">{activeNode.balance}</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Account Age</span>
              <span className="font-mono font-medium text-slate-200">{activeNode.age}</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-[10px]">Recent Transactions</span>
              <span className="font-mono font-medium text-slate-200">{activeNode.txCount} transfers recorded</span>
            </div>
          </div>

          {!readOnly && (
            <button
              onClick={() => onToggleNodeSelect(activeNode.id)}
              className={`w-full py-1.5 px-2.5 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition ${
                selectedNodes.includes(activeNode.id)
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              {selectedNodes.includes(activeNode.id)
                ? 'Tagged as Suspicious'
                : 'Tag as Suspicious Node'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

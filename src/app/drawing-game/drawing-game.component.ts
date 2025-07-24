import { Component, OnInit, OnDestroy } from '@angular/core';
import Konva from 'konva';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drawing-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drawing-game.component.html',
  styleUrls: ['./drawing-game.component.css']
})
export class DrawingGameComponent implements OnInit, OnDestroy {
  private stage: Konva.Stage | null = null;
  private layer: Konva.Layer | null = null;
  private isDrawing = false;
  private lastLine: Konva.Line | null = null;
  selectedShape: 'line' | 'circle' | 'rectangle' = 'line';
  color: string = '#000000';
  strokeWidth: number = 5;

  ngOnInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    if (this.stage) {
      this.stage.destroy();
    }
  }

  private initCanvas() {
    this.stage = new Konva.Stage({
      container: 'canvas-container',
      width: window.innerWidth - 40,
      height: window.innerHeight - 150
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Drawing mode for lines
    this.stage.on('mousedown touchstart', (e) => {
      if (this.selectedShape !== 'line') return;
      this.isDrawing = true;
      const pos = this.stage!.getPointerPosition()!;
      this.lastLine = new Konva.Line({
        stroke: this.color,
        strokeWidth: this.strokeWidth,
        globalCompositeOperation: 'source-over',
        lineCap: 'round',
        lineJoin: 'round',
        points: [pos.x, pos.y, pos.x, pos.y]
      });
      this.layer!.add(this.lastLine);
    });

    this.stage.on('mousemove touchmove', (e) => {
      if (!this.isDrawing || !this.lastLine || this.selectedShape !== 'line') return;
      const pos = this.stage!.getPointerPosition()!;
      const newPoints = this.lastLine.points().concat([pos.x, pos.y]);
      this.lastLine.points(newPoints);
      this.layer!.batchDraw();
    });

    this.stage.on('mouseup touchend', () => {
      this.isDrawing = false;
    });

    // Shape creation for circles and rectangles
    this.stage.on('click', (e) => {
      if (this.selectedShape === 'line') return;
      const pos = this.stage!.getPointerPosition()!;
      let shape: Konva.Shape;

      if (this.selectedShape === 'circle') {
        shape = new Konva.Circle({
          x: pos.x,
          y: pos.y,
          radius: 50,
          fill: this.color,
          stroke: 'black',
          strokeWidth: 2,
          draggable: true
        });
      } else {
        shape = new Konva.Rect({
          x: pos.x - 50,
          y: pos.y - 30,
          width: 100,
          height: 60,
          fill: this.color,
          stroke: 'black',
          strokeWidth: 2,
          draggable: true
        });
      }

      this.layer!.add(shape);
      this.layer!.batchDraw();
    });
  }

  private handleResize() {
    if (this.stage) {
      this.stage.width(window.innerWidth - 40);
      this.stage.height(window.innerHeight - 150);
      this.stage.draw();
    }
  }

  clearCanvas() {
    if (this.layer) {
      this.layer.destroyChildren();
      this.layer.draw();
    }
  }

  saveScenario() {
    if (this.stage) {
      const json = this.stage.toJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'scenario.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  loadScenario(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.stage && typeof reader.result === 'string') {
          this.stage = Konva.Node.create(reader.result, 'canvas-container');
          //this.layer = this.stage.getLayers()[0];
          //this.stage.draw();
        }
      };
      reader.readAsText(file);
    }
  }
}
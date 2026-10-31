class SortingVisualizer {
    private array: number[] = [];
    private container: HTMLElement;
    private arraySize: number = 40;

    constructor() {
        this.container = document.getElementById('array-container')!;
        this.initListeners();
        this.generateNewArray();
    }

    private initListeners(): void {
        document.getElementById('generate-btn')?.addEventListener('click', () => this.generateNewArray());
        document.getElementById('bubble-sort-btn')?.addEventListener('click', () => this.bubbleSort());
    }

    private generateNewArray(): void {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 350) + 20);
        }
        this.renderArray();
    }

    private renderArray(): void {
        this.container.innerHTML = '';
        this.array.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add('array-bar');
            bar.style.height = `${value}px`;
            this.container.appendChild(bar);
        });
    }

    // Example implementation of Bubble Sort with visual delay
    public async bubbleSort(): Promise<void> {
        const bars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
        let len = this.array.length;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                bars[j].style.backgroundColor = '#ef4444'; // Highlight compared bars
                bars[j + 1].style.backgroundColor = '#ef4444';

                if (this.array[j] > this.array[j + 1]) {
                    // Swap in array
                    let temp = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = temp;

                    // Swap heights in DOM
                    bars[j].style.height = `${this.array[j]}px`;
                    bars[j + 1].style.height = `${this.array[j + 1]}px`;
                }

                await new Promise(resolve => setTimeout(resolve, 30));

                bars[j].style.backgroundColor = '#38bdf8'; // Reset color
                bars[j + 1].style.backgroundColor = '#38bdf8';
            }
            bars[len - i - 1].style.backgroundColor = '#22c55e'; // Mark sorted
        }
    }
}

// Initialize the app when the script loads
window.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});

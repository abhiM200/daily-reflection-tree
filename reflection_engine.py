import json
import os
import sys
import re

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header():
    print("\033[95m" + "="*60 + "\033[0m")
    print("\033[94m" + "          DT FELLOWSHIP | PDGMS REFLECTION ENGINE" + "\033[0m")
    print("\033[90m" + "                 Developed by Abhishek" + "\033[0m")
    print("\033[95m" + "="*60 + "\033[0m\n")

class ReflectionEngine:
    def __init__(self, tree_path):
        with open(tree_path, 'r') as f:
            data = json.load(f)
            self.nodes = data['nodes']
        self.signals = {"locus": None, "orient": None, "radius": None}
        self.answers = {}

    def interpolate(self, text):
        def replace_match(match):
            node_id = match.group(1)
            return self.answers.get(node_id, {}).get('answer', match.group(0))
        return re.sub(r'\{(\w+)\.answer\}', replace_match, text)

    def evaluate_decision(self, logic):
        rules = logic.split(';')
        for rule in rules:
            condition, target = rule.split(':')
            path, allowed_values = condition.split('=')
            ref_node_id, _ = path.split('.')
            
            actual_value = self.answers.get(ref_node_id, {}).get('answer')
            possible_values = allowed_values.split('|')

            if actual_value in possible_values:
                return target
        return None

    def run(self, node_id='START'):
        node = self.nodes.get(node_id)
        if not node:
            print(f"Error: Node {node_id} not found.")
            return

        # Silent routing for Decision Nodes
        if node['type'] == 'decision':
            next_node = self.evaluate_decision(node['logic'])
            self.run(next_node)
            return

        clear_screen()
        print_header()
        
        # Display Status
        status = [f"{k.capitalize()}: {v if v else '--'}" for k, v in self.signals.items()]
        print("\033[90m" + " | ".join(status) + "\033[0m\n")

        # Display Node Text
        print(f"\033[97m{self.interpolate(node['text'])}\033[0m\n")

        if node['type'] == 'question':
            for i, opt in enumerate(node['options']):
                print(f"  \033[94m[{i+1}]\033[0m {opt['text']}")
            
            while True:
                try:
                    choice = int(input("\n\033[92mSelect: \033[0m")) - 1
                    if 0 <= choice < len(node['options']):
                        selected = node['options'][choice]
                        self.answers[node_id] = {'answer': selected['text']}
                        if 'signal' in selected:
                            axis, val = selected['signal'].split(':')
                            # Map keys
                            key_map = {'axis1': 'locus', 'axis2': 'orient', 'axis3': 'radius'}
                            ui_key = key_map.get(axis, axis)
                            if ui_key in self.signals:
                                self.signals[ui_key] = val
                        self.run(selected.get('next', node.get('next')))
                        break
                    else:
                        print("\033[91mInvalid choice.\033[0m")
                except ValueError:
                    print("\033[91mEnter a number.\033[0m")

        elif node['type'] in ['reflection', 'bridge', 'start', 'summary']:
            prompt = "Press Enter to begin..." if node['type'] == 'start' else "Press Enter to continue..."
            input(f"\033[90m{prompt}\033[0m")
            self.run(node['next'])

        elif node['type'] == 'end':
            print("\033[95m\nSession Closed. Tomorrow is a new 5x5 grid.\033[0m")
            sys.exit()

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    tree_file = os.path.join(script_dir, "tree.json")
    engine = ReflectionEngine(tree_file)
    engine.run()
